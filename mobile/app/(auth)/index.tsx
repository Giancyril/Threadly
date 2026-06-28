import { useSocialAuth } from "@/hooks/useSocialAuth";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { handleSocialAuth, isLoading } = useSocialAuth();

  return (
    <View className="flex-1 bg-black">
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
              className="flex-row items-center justify-center bg-white rounded-full py-3.5 px-6"
              onPress={() => handleSocialAuth("oauth_google")}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <View className="flex-row items-center justify-center">
                  <Image
                    source={require("../../assets/images/google.png")}
                    className="size-10 mr-3"
                    style={{ width: 36, height: 36 }}
                    resizeMode="contain"
                  />
                  <Text className="text-black font-bold text-base">Continue with Google</Text>
                </View>
              )}
            </TouchableOpacity>

            {/* APPLE SIGNIN ICON */}
            <TouchableOpacity
              className="flex-row items-center justify-center bg-black border border-zinc-700 rounded-full py-3.5 px-6"
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
          <Text className="text-center text-zinc-500 text-xs leading-5 mt-8 px-2">
            By signing up, you agree to our <Text className="text-[#1d9bf0]">Terms of Service</Text>
            {", "}
            <Text className="text-[#1d9bf0]">Privacy Policy</Text>
            {", and "}
            <Text className="text-[#1d9bf0]">Cookie Use</Text>.
          </Text>
        </View>
      </View>
    </View>
  );
}
