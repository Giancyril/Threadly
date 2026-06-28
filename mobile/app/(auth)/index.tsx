import { useSocialAuth } from "@/hooks/useSocialAuth";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { handleSocialAuth, isLoading } = useSocialAuth();

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 px-8 justify-between">
        <View className="flex-1 justify-center">
          {/* DEMO IMAGE */}
          <View className="items-center">
            <Image
              source={require("../../assets/images/auth2.png")}
              className="size-96"
              style={{ width: 384, height: 384 }}
              resizeMode="contain"
            />
          </View>

          <View className="flex-col gap-3">
            {/* GOOGLE SIGNIN BTN */}
            <TouchableOpacity
              className="flex-row items-center justify-center bg-white border border-gray-300 rounded-full py-3.5 px-6"
              onPress={() => handleSocialAuth("oauth_google")}
              disabled={isLoading}
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 1,
              }}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#1DA1F2" />
              ) : (
                <View className="flex-row items-center justify-center">
                  <Image
                    source={require("../../assets/images/google.png")}
                    className="size-10 mr-3"
                    style={{ width: 36, height: 36 }}
                    resizeMode="contain"
                  />
                  <Text className="text-gray-900 font-bold text-base">Continue with Google</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* APPLE SIGNIN ICON */}
            <TouchableOpacity
              className="flex-row items-center justify-center bg-black rounded-full py-3.5 px-6"
              onPress={() => handleSocialAuth("oauth_apple")}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <View className="flex-row items-center justify-center">
                  <Image
                    source={require("../../assets/images/apple.png")}
                    className="size-8 mr-3"
                    style={{ width: 28, height: 28, tintColor: "#ffffff" }}
                    resizeMode="contain"
                  />
                  <Text className="text-white font-bold text-base">Continue with Apple</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Terms and Privacy */}
          <Text className="text-center text-gray-500 text-xs leading-5 mt-8 px-2">
            By signing up, you agree to our <Text className="text-[#1DA1F2]">Terms of Service</Text>
            {", "}
            <Text className="text-[#1DA1F2]">Privacy Policy</Text>
            {", and "}
            <Text className="text-[#1DA1F2]">Cookie Use</Text>.
          </Text>
        </View>
      </View>
    </View>
  );
}
