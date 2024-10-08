import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { editTask } from '../Redux/taskSlice';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const TaskDetail = ({ route, navigation }) => {
  const { columnId, task, taskIndex } = route.params; 
  const [taskName, setTaskName] = useState(task.name);
  const [taskDesc, setTaskDesc] = useState(task.desc);
  const [comments, setComments] = useState(task.comments || []);
  const [attachments, setAttachments] = useState(task.attachments || []);
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const dispatch = useDispatch();

  const saveTask = () => {
    const updatedTask = { ...task, name: taskName, desc: taskDesc, comments, attachments };
    dispatch(editTask({ columnId, taskIndex, updatedTask }));
    navigation.goBack();
  };

  const addComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now(),
        text: newComment,
        replies: [],
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
    }
  };

  const addReply = (commentId) => {
    if (replyText.trim()) {
      const updatedComments = comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, { id: Date.now(), text: replyText }],
          };
        }
        return comment;
      });
      setComments(updatedComments);
      setReplyText('');
      setReplyToCommentId(null);
    }
  };

  const uploadAttachment = () => {
    launchImageLibrary({ mediaType: 'photo', includeBase64: false }, (response) => {
      if (!response.didCancel && !response.error && response.assets) {
        const source = response.assets[0].uri;
        setAttachments([...attachments, source]);
      }
    });
  };

  const captureImage = () => {
    launchCamera({ mediaType: 'photo', includeBase64: false }, (response) => {
      if (!response.didCancel && !response.error && response.assets) {
        const source = response.assets[0].uri;
        setAttachments([...attachments, source]);
      }
    });
  };

  const removeAttachment = (uri) => {
    setAttachments(attachments.filter((attachment) => attachment !== uri));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Task Name</Text>
      <TextInput
        value={taskName}
        onChangeText={setTaskName}
        placeholder="Task Name"
        style={styles.input}
      />
      <Text style={styles.label}>Task Description</Text>
      <TextInput
        value={taskDesc}
        onChangeText={setTaskDesc}
        placeholder="Task Description"
        style={styles.input}
      />
      <Text style={styles.label}>Comments</Text>
      <TextInput
        value={newComment}
        onChangeText={setNewComment}
        placeholder="Add a comment"
        style={styles.input}
      />
      <Button title="Add Comment" onPress={addComment} />
      <FlatList
        data={comments}
        renderItem={({ item }) => (
          <View style={styles.commentCard}>
            <Text style={styles.comment}>{item.text}</Text>
            <Button title="Reply" onPress={() => setReplyToCommentId(item.id)} />
            {replyToCommentId === item.id && (
              <View style={styles.replyContainer}>
                <TextInput
                  value={replyText}
                  onChangeText={setReplyText}
                  placeholder="Add a reply"
                  style={styles.input}
                />
                <Button title="Add Reply" onPress={() => addReply(item.id)} />
              </View>
            )}
            <FlatList
              data={item.replies}
              renderItem={({ item: reply }) => (
                <View style={styles.replyCard}>
                  <Text style={styles.reply}>{reply.text}</Text>
                </View>
              )}
              keyExtractor={(reply) => reply.id.toString()}
            />
          </View>
        )}
        keyExtractor={(comment) => comment.id.toString()}
      />
      <Button title="Upload Attachment" onPress={uploadAttachment} />
      <Button title="Capture Image" onPress={captureImage} />
      <FlatList
        data={attachments}
        renderItem={({ item }) => (
          <View style={styles.attachmentContainer}>
            <Image source={{ uri: item }} style={styles.imagePreview} />
            <TouchableOpacity style={styles.crossButton} onPress={() => removeAttachment(item)}>
              <Text style={styles.crossButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Save Task" onPress={saveTask} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  commentCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  comment: {
    marginBottom: 5,
    fontSize: 16,
  },
  replyContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  replyCard: {
    backgroundColor: '#e9ecef',
    borderRadius: 5,
    padding: 8,
    marginVertical: 5,
    marginLeft: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 3,
  },
  reply: {
    fontSize: 14,
    marginBottom: 5,
  },
  attachmentContainer: {
    marginVertical: 5,
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginVertical: 5,
  },
  crossButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 15,
    padding: 5,
  },
  crossButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TaskDetail;
