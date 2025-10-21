import { View, Modal, TouchableWithoutFeedback } from "react-native";
import { styles } from "../styles/components.styles";

export default function Overlay({ visible, onClose, children }) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlayBackdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.overlayContainer}>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
