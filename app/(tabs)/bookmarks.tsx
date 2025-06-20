import Loader from "@/components/Loader";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/feed.styles";
import { useQuery } from "convex/react";
import { Image } from "expo-image";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const Bookmarks = () => {
  const bookmarkedPosts = useQuery(api.bookmarks.getBookmarkedPosts);

  if (!bookmarkedPosts) return <Loader />;
  if (bookmarkedPosts.length === 0) {
    return <NoBookmarksFound />;
  }
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookmarks</Text>
      </View>

      {/* POSTS */}

      <ScrollView
        contentContainerStyle={{
          padding: 8,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {bookmarkedPosts.map((post) => {
          if (!post) return null;

          return (
            <View
              key={post._id}
              style={{
                width: "33.33%",
                padding: 4,
              }}
            >
              <Image
                source={{ uri: post.imageUrl }}
                style={{ width: "100%", aspectRatio: 1 }}
                contentFit="cover"
                transition={200}
                cachePolicy="memory-disk"
              />
            </View>
          );
        })}
      </ScrollView>
      <Text>Bookmarks</Text>
    </View>
  );
};

export default Bookmarks;

const NoBookmarksFound = () => {
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
        No Bookmarks yet
      </Text>
    </View>
  );
};
