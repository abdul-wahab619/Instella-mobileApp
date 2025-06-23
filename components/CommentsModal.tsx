import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/feed.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation, useQuery } from "convex/react";
import React from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Comment from "./Comment";
import Loader from "./Loader";

type CommentsModalProps = {
  postId: Id<"posts">;
  visible: boolean;
  onClose: () => void;
};

export default function CommentsModal({
  onClose,
  postId,
  visible,
}: CommentsModalProps) {
  const [newComment, setNewComment] = React.useState("");
  const comments = useQuery(api.comments.getComments, { postId });
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await addComment({ content: newComment, postId });
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  const addComment = useMutation(api.comments.addComment);
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Comments</Text>
          <View style={{ width: 24 }} />
        </View>
        {comments === undefined ? (
          <Loader />
        ) : (
          <FlatList
            data={comments}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Comment
                {...item}
                user={{
                  fullname: item.user.fullName,
                  image: item.user.image,
                }}
              />
            )}
            contentContainerStyle={styles.commentsList}
          />
        )}
        <View style={styles.commentInput}>
          <TextInput
            style={styles.input}
            placeholderTextColor={COLORS.grey}
            placeholder="Add a comment..."
            value={newComment}
            onChangeText={setNewComment}
            multiline
          />

          <TouchableOpacity
            onPress={handleAddComment}
            disabled={!newComment.trim()}
          >
            <Text
              style={[
                styles.postButton,
                !newComment.trim() && styles.postButtonDisabled,
              ]}
            >
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
