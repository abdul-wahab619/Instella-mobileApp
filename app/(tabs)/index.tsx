import Loader from "@/components/Loader";
import Post from "@/components/Post";
import Story from "@/components/Story";
import { mockUsers } from "@/constants/mock-data";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "convex/react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/feed.styles";

export default function Index() {
  const posts = useQuery(api.posts.getFeedPosts);
  const { signOut } = useAuth();

  if (posts === undefined) return <Loader />;
  if (posts.length === 0) return <NoPostFound />;

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Instella</Text>
        <TouchableOpacity
          onPress={() =>
            Alert.alert("Sign out", "Are you sure you want to sign out?", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Sign out",
                style: "destructive",
                onPress: () => signOut(),
              },
            ])
          }
        >
          <Ionicons name="log-out-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          style={styles.storiesContainer}
        >
          {mockUsers.map((story) => (
            <Story key={story.id} story={story} />
          ))}
        </ScrollView>

        {posts.map((post) => (
          <Post
            key={post._id}
            post={{ ...post, caption: post.caption ?? "" }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export const NoPostFound = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: COLORS.primary,
        }}
      >
        No Posts yet
      </Text>
    </View>
  );
};
