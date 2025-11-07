import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, CardContent, CardHeader, Grid, Typography, CircularProgress, Alert,} from "@mui/material";
import { fetchCarts } from "../store/slices/cartsSlice";

const COLORS = [
  "linear-gradient(135deg, #42a5f5, #1565c0)",
  "linear-gradient(135deg, #66bb6a, #2e7d32)",
  "linear-gradient(135deg, #ffb74d, #f57c00)",
  "linear-gradient(135deg, #ba68c8, #8e24aa)",
  "linear-gradient(135deg, #ef5350, #c62828)",
  "linear-gradient(135deg, #26c6da, #0097a7)",
];

const Carts = () => {
  const dispatch = useDispatch();
  const { carts, loading, error } = useSelector((state) => state.carts);

  useEffect(() => {
    if (carts.length === 0) {
      dispatch(fetchCarts());
    }
  }, [carts.length, dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">Failed to load carts: {error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f6fa", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        gutterBottom >
        🛒 All Customer Carts
      </Typography>

      {carts.map((cart, index) => (
        <Card
          key={cart.id}
          sx={{
            mb: 5,
            width: "100%",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 6,
            background: COLORS[index % COLORS.length],
            color: "white",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": { transform: "scale(1.01)", boxShadow: 10 },
          }}
        >
          <CardHeader
            title={`🛍️ Cart ID: ${cart.id}`}
            subheader={`User ID: ${cart.userId}`} />

          <CardContent
           
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                mb: 3,
              }}
            >
              <Typography variant="subtitle1">
                🧾 Total Products: {cart.totalProducts}
              </Typography>
              <Typography variant="subtitle1">
                📦 Total Quantity: {cart.totalQuantity}
              </Typography>
              <Typography variant="subtitle1">
                💰 Total: ${cart.total.toFixed(2)}
              </Typography>
              <Typography variant="subtitle1">
                🎯 Discounted Total: ${cart.discountedTotal.toFixed(2)}
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {cart.products?.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <Card
                    sx={{
                      p: 2,
                      height: "100%",
                      textAlign: "center",
                      borderRadius: 2,
                      backgroundColor: "#ffffff",
                      boxShadow: 3,
                      color: "#333",
                      transition: "0.3s",
                      "&:hover": {
                        boxShadow: 6,
                        transform: "translateY(-5px)",
                      },
                    }}
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      style={{
                        width: "100%",
                        height: "160px",
                        objectFit: "contain",
                        borderRadius: 8,
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{ mt: 1, fontWeight: 600 }}
                    >
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ${product.price}
                    </Typography>
                    <Typography variant="body2">
                      Qty: {product.quantity}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "green", fontWeight: 600 }}
                    >
                      Discount: {product.discountPercentage}%
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Carts;
