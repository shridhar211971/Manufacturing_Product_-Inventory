import React, { useEffect, useState } from "react";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper,} from "@mui/material";

export default function Products() {
  const [products, setProducts] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProducts(data.products);
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f6fa", minHeight: "100vh" }}>
      <Typography>
        🛍️ Product List
      </Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1565c0" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Thumbnail</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Brand</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Category</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Price ($)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Rating</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Stock</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((p) => (
              <TableRow>
                <TableCell>{p.id}</TableCell>
                <TableCell>
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    style={{ width: 60, height: 60, borderRadius: 8 }}
                  />
                </TableCell>
                <TableCell>{p.title}</TableCell>
                <TableCell>{p.brand}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>${p.price}</TableCell>
                <TableCell>{p.rating}</TableCell>
                <TableCell>{p.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
