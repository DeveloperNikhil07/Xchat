import { FlatList, Text, TouchableOpacity } from "react-native";
import { styles } from "./ChatFilters.style";

export interface FilterItem {
  id: string;
  label: string;
  count?: number;
}

interface Props {
  filters: FilterItem[];
  selected: string;
  onChange: (id: string) => void;
}

export default function ChatFilters({
  filters,
  selected,
  onChange,
}: Props) {
  return (
    <FlatList
      horizontal
      data={filters}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => {
        const active = selected === item.id;

        return (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onChange(item.id)}
            style={[
              styles.filter,
              active && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.label,
                active && styles.activeLabel,
              ]}
            >
              {item.label}
            </Text>

            {item.count !== undefined &&
              item.count > 0 && (
                <Text
                  style={[
                    styles.count,
                    active && styles.activeCount,
                  ]}
                >
                  {item.count}
                </Text>
              )}
          </TouchableOpacity>
        );
      }}
    />
  );
}