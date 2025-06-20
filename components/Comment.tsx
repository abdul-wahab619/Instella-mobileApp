import { styles } from "@/styles/feed.styles";
import { formatDistanceToNow } from "date-fns";
import React from "react";
import { Image, Text, View } from "react-native";

interface CommentProps {
  content: string;
  _creationTime: number;
  user: {
    fullname: string;
    image: string;
  };
}

export default function Comment({
  content,
  _creationTime,
  user,
}: CommentProps) {
  return (
    <View style={styles.commentContainer}>
      <Image source={{ uri: user.image }} style={styles.commentAvatar} />
      <View style={styles.commentContent}>
        <Text style={styles.commentUsername}>{user.fullname}</Text>
        <Text style={styles.commentText}>{content}</Text>
        <Text style={styles.commentTime}>
          {formatDistanceToNow(_creationTime, {
            addSuffix: true,
          })}
        </Text>
      </View>
    </View>
  );
}
