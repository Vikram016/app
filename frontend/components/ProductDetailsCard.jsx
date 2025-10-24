import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import Rating from "./Rating";
import { Colors } from "../constants/Utils";
import React from "react";

const ProductDetailsCard = ({
  product,
  qty,
  setQty,
  handleAddToCart,
  disableAddToCart,
}) => {
  if (!product) {
    return null;
  }

  return (
    <View style={styles.detailsCard}>
      <Text style={styles.productName}>{product.name}</Text>

      <View style={styles.ratingPriceRow}>
        <Text style={styles.priceValue}>${product.price}</Text>
        <Rating value={product.rating} text={`${product.numReviews}`} />
      </View>

      <View style={styles.divider} />

      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.statusQuantityCart}>
        <View style={styles.statusContainer}>
          <Text style={styles.label}>Status</Text>
          <Text
            style={[
              styles.statusText,
              product.countInStock > 0 ? styles.inStock : styles.outOfStock,
            ]}
          >
            {product.countInStock > 0 ? "In stock" : "Out of Stock"}
          </Text>
        </View>

        {product.countInStock > 0 && (
          <View style={styles.quantityContainer}>
            <Text style={styles.label}>Quantity:</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={qty}
                onValueChange={(itemValue) => setQty(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                {[...Array(product.countInStock).keys()].map((x) => (
                  <Picker.Item
                    key={x + 1}
                    label={(x + 1).toString()}
                    value={x + 1}
                    color={Colors.darkGray}
                  />
                ))}
              </Picker>
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.addToCartButton,
            disableAddToCart && styles.disableAddToCart,
          ]}
          onPress={handleAddToCart}
          disabled={disableAddToCart}
        >
          <Ionicons name="cart-outline" size={20} color={Colors.white} />
          <Text style={styles.addToCartText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailsCard;

const styles = StyleSheet.create({
  detailsCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  productName: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  ratingPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
  },
  divider: {
    height: 1.5,
    backgroundColor: Colors.lightGray,
    marginVertical: 15,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  statusQuantityCart: {
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
  },
  inStock: {
    color: Colors.success,
  },
  outOfStock: {
    color: Colors.danger,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: Colors.white,
    width: "50%",
  },
  picker: {
    height: 60,
  },
  pickerItem: {
    fontSize: 16,
  },
  addToCartButton: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 2,
  },
  addToCartText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
  },
  disableAddToCart: {
    backgroundColor: Colors.lightGray,
    opacity: 0.7,
  },
});
