import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../store";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
};

export default RootLayout;
