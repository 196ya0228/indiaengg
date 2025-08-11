import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Package, Grid3X3 } from "lucide-react";
import { useProductSearch } from "@/hooks/useProductSearch";
import ProductCard from "./ProductCard";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const SearchModal = ({ isOpen, onClose, initialQuery = "" }: SearchModalProps) => {
  const { searchQuery, setSearchQuery, searchResults, searchSuggestions, loading } = useProductSearch();

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery, setSearchQuery]);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Products & Machinery
          </DialogTitle>
        </DialogHeader>

        {/* Search Input */}
        <div className="relative">
          <div className="flex items-center border-2 border-gray-200 rounded-lg px-4 py-3 focus-within:border-blue-500 transition-colors">
            <Search className="h-5 w-5 text-gray-400 mr-3" />
            <Input
              type="text"
              placeholder="Search for machinery, equipment, parts..."
              className="border-0 outline-0 focus-visible:ring-0 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <Button
                onClick={clearSearch}
                variant="ghost"
                size="sm"
                className="ml-2 p-1 h-auto"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Search Suggestions */}
        {!searchQuery && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-600">Popular Searches:</h3>
            <div className="flex flex-wrap gap-2">
              {searchSuggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-sm"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchQuery && (
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : searchResults.hasResults ? (
              <div className="space-y-6">
                {/* Categories */}
                {searchResults.categories.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                      <Grid3X3 className="h-5 w-5 text-orange-600" />
                      Categories ({searchResults.categories.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {searchResults.categories.map((category) => (
                        <div
                          key={category.id}
                          className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            onClose();
                            const element = document.getElementById('products-section');
                            element?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          <h4 className="font-semibold">{category.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products */}
                {searchResults.products.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                      <Package className="h-5 w-5 text-blue-600" />
                      Products ({searchResults.products.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {searchResults.products.map((product) => (
                        <ProductCard
                          key={product.id}
                          image={product.image || "/placeholder.svg"}
                          title={product.title}
                          price={product.price}
                          description={product.description}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find anything matching "{searchQuery}"
                </p>
                <p className="text-sm text-gray-500">
                  Try searching for: jaggery, sugar plant, crusher, or machinery
                </p>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="border-t pt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Press Esc to close
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {searchQuery && (
              <Button
                onClick={() => {
                  onClose();
                  const element = document.getElementById('products-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View All Products
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
