import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useEffect } from "react";
// FIX: Add useRouter to the import list
import { useLocalSearchParams, useRouter } from "expo-router";
import Product from "../../components/Product";
// FIX: Change to standard PascalCase for React components
import Message from "../../components/Message";
import Header from "../../components/Header";

import { Colors } from "../../constants/Utils";
import { useGetProductsQuery } from "../../slices/productsApiSlice";

// Component definition starts here
const Home = () => {
  const { keyword = "", pageNumber = "1" } = useLocalSearchParams();
  const router = useRouter();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    keyword,
    // Ensure pageNumber is a number for the API call
    pageNumber: Number(pageNumber),
  });

  // FIX: useEffect must be INSIDE the component function
  useEffect(() => {
    refetch();
  }, [keyword, pageNumber, refetch]);

  // Pagination Logic (Defined as a component/function inside Home)
  const renderPaginationButtons = () => {
    // Check for data and pages safely before returning anything
    if (!data?.pages || data.pages <= 1) return null;

    return (
      <View style={styles.paginationContainer}>
        {Array.from({ length: data.pages }, (_, i) => i + 1).map((page) => (
          <TouchableOpacity
            key={page}
            style={[
              styles.pageButton,
              // FIX: Ensure data?.page exists before comparison
              page === data?.page && styles.activePageButton,
            ]}
            onPress={() => {
              router.setParams({
                pageNumber: page.toString(),
                ...(keyword ? { keyword } : {}),
              });
            }}
          >
            <Text
              style={[
                styles.pageButtonText,
                // FIX: Ensure data?.page exists before comparison
                page === data?.page && styles.activePageButtonText,
              ]}
            >
              {page}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const ListHeader = () => (
    <>
      <Header />
      {error && (
        // FIX: Change to the correctly imported component name
        <Message variant="error" style={styles.errorMessage}>
          {error?.data?.message || error.error || "Failed to Fetch products"}
        </Message>
      )}
    </>
  );

  const ListFooter = () => renderPaginationButtons();

  // Component's main render RETURN starts here
  return (
    <SafeAreaProvider style={styles.safeArea}>
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={data?.products} // Assuming the key is 'products' (lowercase 'p')
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <Product product={item} />}
          contentContainerStyle={styles.list}
          numColumns={2}
          // FIX: Typo in style name
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<ListHeader />}
          ListFooterComponent={<ListFooter />}
          ListEmptyComponent={
            !error && (
              <Message variant="info" style={styles.emptyMessage}>
                No Products Found
              </Message>
            )
          }
        />
      )}
    </SafeAreaProvider>
  );
};
// End of component definition

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.offWhite,
    // FIX: Change semicolon to comma
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessage: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  emptyMessage: {
    marginTop: 20,
    alignSelf: "center",
  },
  list: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  // FIX: Correct typo 'columnWarapper' -> 'columnWrapper'
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    flexWrap: "wrap",
    gap: 10,
  },
  pageButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    // FIX: 'background' is web property, use 'backgroundColor' in React Native
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    // FIX: Correct typo 'minWigth' -> 'minWidth'
    minWidth: 40,
    alignItems: "center",
  },
  activePageButton: {
    backgroundColor: Colors.primary,
  },
  pageButtonText: {
    color: Colors.primary,
    fontWeight: "600",
  },
  activePageButtonText: {
    color: Colors.white,
  },
});
