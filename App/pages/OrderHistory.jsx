import React, { useCallback, useState } from 'react';
import {
  View, Text, Image, FlatList, TouchableOpacity,
  ActivityIndicator, RefreshControl, StyleSheet,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '../api'; // same import as Cart.js

const SERVER_URL = 'http://localhost:3000'; // only for image URLs
const ORDERS_URL = '/api/order/mine';

const STATUS_COLORS = {
  Pending: '#f59e0b',
  Processing: '#3b82f6',
  Shipped: '#6366f1',
  Delivered: '#16a34a',
  Cancelled: '#dc2626',
};

const formatDate = (iso) => {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
};

const OrderHistory = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setError(null);
      const res = await api.get(ORDERS_URL);
      setOrders(res.data.orders || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reload every time the screen is opened
  useFocusEffect(
    useCallback(() => {
      fetchOrders();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };

  const renderOrder = ({ item: order }) => {
    const validItems = (order.items || []).filter((i) => i.product); // skip deleted products
    const first = validItems[0]?.product;
    const itemCount = validItems.reduce((sum, i) => sum + i.quantity, 0);
    const color = STATUS_COLORS[order.status] || '#8e8e93';

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailsScreen', { order })}
      >
        <View style={styles.topRow}>
          <Text style={styles.orderId}>Order #{String(order._id).slice(-6).toUpperCase()}</Text>
          <View style={[styles.badge, { backgroundColor: color + '22' }]}>
            <Text style={[styles.badgeText, { color }]}>{order.status}</Text>
          </View>
        </View>

        <Text style={styles.date}>{formatDate(order.createdAt)}</Text>

        <View style={styles.itemRow}>
          {first?.image ? (
            <Image source={{ uri: `${SERVER_URL}${first.image}` }} style={styles.thumb} />
          ) : (
            <View style={[styles.thumb, { backgroundColor: '#f2f2f7' }]} />
          )}
          <View style={{ flex: 1 }}>
            <Text style={styles.itemName} numberOfLines={1}>
              {first ? first.name || first.title : 'Product unavailable'}
            </Text>
            <Text style={styles.itemMeta}>
              {itemCount} item{itemCount === 1 ? '' : 's'}
              {validItems.length > 1 ? `  •  +${validItems.length - 1} more product(s)` : ''}
            </Text>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.payment}>{order.paymentMethod}</Text>
          <Text style={styles.total}>Rs. {order.totalAmount?.toLocaleString()}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="red" style={{ flex: 1 }} />;
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={orders.length === 0 ? styles.emptyContainer : { paddingBottom: 24 }}
      data={orders}
      keyExtractor={(o) => o._id}
      renderItem={renderOrder}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      ListEmptyComponent={
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.emptyText}>{error || "You haven't placed any orders yet"}</Text>
          {error ? (
            <TouchableOpacity onPress={fetchOrders} style={styles.retryBtn}>
              <Text style={styles.retryText}>Try again</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  emptyContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 15, color: '#666' },
  retryBtn: { marginTop: 12, backgroundColor: 'red', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  retryText: { color: '#fff', fontWeight: '600' },
  card: {
    backgroundColor: '#fff', borderRadius: 14, marginHorizontal: 16, marginTop: 16,
    padding: 16, elevation: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6,
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderId: { fontSize: 16, fontWeight: '700', color: '#1c1c1e' },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { fontSize: 12, fontWeight: '700' },
  date: { fontSize: 13, color: '#8e8e93', marginTop: 4, marginBottom: 12 },
  itemRow: { flexDirection: 'row', alignItems: 'center' },
  thumb: { width: 56, height: 56, borderRadius: 8, marginRight: 12 },
  itemName: { fontSize: 15, fontWeight: '600', color: '#1c1c1e' },
  itemMeta: { fontSize: 13, color: '#8e8e93', marginTop: 2 },
  bottomRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#eee',
  },
  payment: { fontSize: 13, color: '#666' },
  total: { fontSize: 16, fontWeight: '700', color: 'red' },
});

export default OrderHistory;