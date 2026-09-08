import { useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import { api } from '../../../services/api';
import { formatDate } from '../../../utils/formatDate';
import { formatPrice } from '../../../utils/formatPrice';
import { orderStatusOptions } from './orderStatus';
import { ProductImage, SelectStatus } from './styles';

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    date: PropTypes.string,
    status: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        quantity: PropTypes.number,
        price: PropTypes.number,
      }),
    ).isRequired,
  }).isRequired,
};

export default function Row({ row }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(row.status);

  async function newStatusOrder(newStatus) {
    await api.put(`/orders/${row.orderId}`, { status: newStatus });
    setStatus(newStatus);
  }

  return (
    <>
      {/* Linha principal */}
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          #{row.orderId}
        </TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{formatDate(row.date)}</TableCell>
        <TableCell>
          <SelectStatus
            options={orderStatusOptions.filter(
              (option) => option.value !== 'All',
            )}
            placeholder="Status"
            value={orderStatusOptions.find((option) => option.value === status)}
            onChange={(selectedStatus) => {
              newStatusOrder(selectedStatus.value);
            }}
          />
        </TableCell>
        <TableCell align="right">{formatPrice(row.total)}</TableCell>
      </TableRow>

      {/* Linha expandida */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Detalhes
              </Typography>
              <Table size="small" aria-label="details">
                <TableHead>
                  <TableRow>
                    <TableCell>Produto</TableCell>
                    <TableCell align="right">Quantidade</TableCell>
                    <TableCell align="right">Prévia</TableCell>
                    <TableCell align="right">Valor unitário</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((product, index) => (
                    <TableRow key={`${product.name}-${index}`}>
                      <TableCell component="th" scope="row">
                        {product.name || 'Produto não informado'}
                      </TableCell>
                      <TableCell align="right">
                        {product.quantity || 0}
                      </TableCell>
                      <TableCell align="right">
                        <ProductImage src={product.url} alt={product.name} />
                      </TableCell>
                      <TableCell align="right">
                        {formatPrice(Number(product.price || 0))}
                      </TableCell>
                      <TableCell align="right">
                        {formatPrice(
                          Number(product.quantity || 0) *
                            Number(product.price || 0),
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
