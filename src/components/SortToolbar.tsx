import { Flex, Select, Spacer, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useDebounce } from '../hooks/useDebounce';
import { SORT_OPTIONS } from '../constants';
import { useEffect, useState } from 'react';

interface SortToolbarProps {
    onSortChange: (value: string) => void;
    onSearchChange: (value: string) => void;
    currentSort: string;
    searchValue: string;
}

export const SortToolbar = ({
    onSortChange,
    onSearchChange,
    currentSort,
    searchValue
}: SortToolbarProps) => {
    const [localSearch, setLocalSearch] = useState(searchValue);
    // wait a bit before searching
    const debouncedSearch = useDebounce(localSearch, 300);

    // sync with parent state
    useEffect(() => {
        setLocalSearch(searchValue);
    }, [searchValue]);

    useEffect(() => {
        // update search when user stops typing
        onSearchChange(debouncedSearch);
    }, [debouncedSearch, onSearchChange]);

    return (
        <Flex w="full" p={4} bg="gray.50" borderRadius="lg" alignItems="center" gap={4}>
            <InputGroup maxW="500px">
                <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.400" />
                </InputLeftElement>
                <Input
                    placeholder="Search products..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    bg="white"
                />
            </InputGroup>
            <Spacer />
            <Select
                w="200px"
                value={currentSort}
                onChange={(e) => onSortChange(e.target.value)}
                bg="white"
            >
                {Object.entries(SORT_OPTIONS).map(([key, value]) => (
                    <option key={value} value={value}>
                        {key.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ')}
                    </option>
                ))}
            </Select>
        </Flex>
    );
}; 