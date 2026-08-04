import {
    Image,
    Pressable,
    ScrollView,
    Text,
    View
} from "react-native";

import { styles } from "./MediaPreview.style";


interface Props {
    images: any[];
    onPress: (uri: string) => void;
}


export default function MediaPreview({
    images,
    onPress
}: Props) {


    return (

        <View style={styles.container}>

            <Text style={styles.title}>
                Media, links and docs
            </Text>


            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >

                {
                    images.slice(0, 5).map((item, index) => (

                        <Pressable
                            key={index}
                            onPress={() => onPress(item.image)}
                        >

                            <Image
                                source={{
                                    uri: item.image
                                }}
                                style={styles.image}
                            />

                        </Pressable>

                    ))
                }


            </ScrollView>


        </View>

    )

}