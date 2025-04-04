import React from "react";
import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ backgroundColor: "#fff", color: "#111010", py: 4 }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">About Us</Typography>
            <Typography variant="body2">
              Delicious food delivered to your doorstep. Fresh ingredients, fast
              service, and great taste!
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Quick Links</Typography>
            <Box>
              <Typography variant="body2" component="a" href="/menu" sx={{ color: "#141111", textDecoration: "none", display: "block" }}>Menu</Typography>
              <Typography variant="body2" component="a" href="/about" sx={{ color: "#0b0909", textDecoration: "none", display: "block" }}>About Us</Typography>
              <Typography variant="body2" component="a" href="/contact" sx={{ color: "#100e0e", textDecoration: "none", display: "block" }}>Contact</Typography>
              <Typography variant="body2" component="a" href="/faq" sx={{ color: "#0d0b0b", textDecoration: "none", display: "block" }}>FAQ</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">Follow Us</Typography>
            <Box display="flex" gap={2}>
              <IconButton href="#" sx={{ color: "#fff" }}><Facebook /></IconButton>
              <IconButton href="#" sx={{ color: "#fff" }}><Twitter /></IconButton>
              <IconButton href="#" sx={{ color: "#fff" }}><Instagram /></IconButton>
              <IconButton href="#" sx={{ color: "#fff" }}><LinkedIn /></IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box mt={4} textAlign="center">
          <Typography variant="body2">&copy; {new Date().getFullYear()} Foodie Express. All rights reserved.</Typography>
        </Box>
      </Container>
    </Box>
  );
}
