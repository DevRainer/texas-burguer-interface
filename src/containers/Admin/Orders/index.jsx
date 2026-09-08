import { useEffect, useState } from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { api } from '../../../services/api';
import Row from './row';

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadOrders() {
      try {
        const { data } = await api.get('/orders');
        setOrders(Array.isArray(data) ? data : data.orders || []);
      } catch (requestError) {
        console.error('Erro ao carregar pedidos:', requestError);
        setError('Não foi possível carregar os pedidos.');
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  function createData(order) {
    return {
      name: order.user?.name || order.user?.email || 'Cliente não informado',
      orderId: order._id || order.id,
      date: order.createdAt,
      status: order.status || 'pending',
      products: order.products || order.product || order.items || [],
      total: Number(order.total || 0),
    };
  }

  const rows = orders.map(createData);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Pedido</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={6}>Carregando pedidos...</TableCell>
            </TableRow>
          )}
          {!loading && error && (
            <TableRow>
              <TableCell colSpan={6}>{error}</TableCell>
            </TableRow>
          )}
          {!loading && !error && rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={6}>Nenhum pedido encontrado.</TableCell>
            </TableRow>
          )}
          {!loading &&
            !error &&
            rows.map((row) => <Row key={row.orderId} row={row} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
