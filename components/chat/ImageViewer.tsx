import ImageViewing from "react-native-image-viewing";

interface Props {
  visible: boolean;
  image: string | null;
  onClose: () => void;
}

export default function ImageViewer({
  visible,
  image,
  onClose,
}: Props) {
  return (
    <ImageViewing
      images={image ? [{ uri: image }] : []}
      imageIndex={0}
      visible={visible && !!image}
      onRequestClose={onClose}
    />
  );
}