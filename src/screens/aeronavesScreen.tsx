// HomeScreen.tsx

import { useDebounce } from "@/hooks/use-debounce";
import { Aeronave, AeronaveSearchItem, AeronaveType } from "@/models/aeronaves";
import {
  getAeronaveDetails,
  getAeronaveTypes,
  searchAeronaves,
} from "@/service/apiService";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function AeronavesScreen() {
  const [types, setTypes] = useState<AeronaveType[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<AeronaveSearchItem[]>([]);
  const [selectedAeronave, setSelectedAeronave] = useState<Aeronave | null>(
    null,
  );

  const [loadingTypes, setLoadingTypes] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTypes();
  }, []);

  const loadTypes = async () => {
    try {
      setLoadingTypes(true);

      const response = await getAeronaveTypes();

      const availableTypes = [
        {
          id: "",
          value: "ALL",
          label: "All",
        },
        ...response,
      ];

      setTypes(availableTypes);
      setSelectedType("");
    } catch (err) {
      setError("Could not load Aeronave types.");
    } finally {
      setLoadingTypes(false);
    }
  };

  useEffect(() => {
    const loadSearchResults = async () => {
      setDebouncedQuery(useDebounce(query, 500));
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }
      try {
        setLoadingSearch(true);
        setError(null);

        const response = await searchAeronaves(
          debouncedQuery.trim(),
          selectedType,
        );

        setResults(response);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError("Failed to search Aeronaves.");
        }
      } finally {
        setLoadingSearch(false);
      }
    };
    loadSearchResults();
  }, [debouncedQuery, selectedType]);

  const handleAeronavePress = useCallback(async (code: string) => {
    try {
      setLoadingDetails(true);
      setError(null);

      const details = await getAeronaveDetails(code);

      setSelectedAeronave(details);
    } catch {
      setError("Failed to load Aeronave details.");
    } finally {
      setQuery("");
      setLoadingDetails(false);
    }
  }, []);

  return (
    <FlatList
      style={styles.container}
      data={results}
      keyExtractor={(item) => item.matricula}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <>
          <Text style={styles.title}>Aeronave Search</Text>

          <TextInput
            placeholder="Search Aeronave code..."
            value={query}
            onChangeText={setQuery}
            editable={!loadingTypes}
            autoCapitalize="characters"
            style={styles.input}
          />

          {loadingTypes ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              horizontal
              data={types}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterList}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => setSelectedType(item.id)}
                  style={[
                    styles.filterChip,
                    selectedType === item.id
                      ? styles.filterChipSelected
                      : undefined,
                  ]}
                >
                  <Text>{item.label}</Text>
                </Pressable>
              )}
            />
          )}

          {loadingSearch && <ActivityIndicator style={styles.spacing} />}

          {error && <Text style={styles.error}>{error}</Text>}

          {!loadingSearch &&
            debouncedQuery.length > 0 &&
            results.length === 0 && (
              <Text style={styles.empty}>No Aeronaves found.</Text>
            )}

          {selectedAeronave && (
            <View style={styles.detailsCard}>
              <Text style={styles.detailsTitle}>Aeronave Details</Text>

              <Text>Code: {selectedAeronave.matricula}</Text>

              <Text>Manufacturer: {selectedAeronave.manufacturer}</Text>

              <Text>Type: {selectedAeronave.type}</Text>

              <Text>Max Passengers: {selectedAeronave.maxPassengers}</Text>

              <Text>Range: {selectedAeronave.rangeKm} km</Text>
            </View>
          )}

          {loadingDetails && <ActivityIndicator style={styles.spacing} />}
        </>
      }
      renderItem={({ item }) => (
        <Pressable
          style={styles.resultItem}
          onPress={() => handleAeronavePress(item.matricula)}
        >
          <Text style={styles.code}>{item.matricula}</Text>
        </Pressable>
      )}
    />
  );
}

//
// Styles
//

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
    backgroundColor: "blue",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "yellow",
  },

  filterList: {
    maxHeight: 80,
    backgroundColor: "red",
    paddingVertical: 16,
  },

  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    maxHeight: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DDD",
    marginRight: 8,
  },

  filterChipSelected: {
    backgroundColor: "#EAEAEA",
  },

  resultItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    backgroundColor: "green",
  },

  code: {
    fontWeight: "700",
    fontSize: 16,
  },

  name: {
    color: "#666",
    marginTop: 2,
  },

  detailsCard: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DDD",
    gap: 6,
    backgroundColor: "pink",
  },

  detailsTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  spacing: {
    marginVertical: 16,
  },

  error: {
    color: "red",
    marginVertical: 12,
  },

  empty: {
    marginVertical: 12,
    color: "#666",
  },
});
function getAeronavesDetail(code: string) {
  throw new Error("Function not implemented.");
}
