// search/search.jsx
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "./search.css";

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [showFilters, setShowFilters] = useState(false);
    
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    
    const [filters, setFilters] = useState({
        q: searchParams.get('q') || '',
        p: searchParams.get('p') || '',
        c: searchParams.get('c') || '',
        sb: searchParams.get('sb') || ''
    });

    useEffect(() => {
        fetchSearchResults();
    }, [searchParams]);

    const fetchSearchResults = async () => {
        setIsLoading(true);
        setError(null);

        const queryString = searchParams.toString();
        if (!queryString) {
            setSearchResults([]);
            setIsLoading(false);
            return;
        }

        const API_URL = `http://localhost:8000/shop/search/?${queryString}`;
        
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            setSearchResults(data.products || []);
            
            if (data.categories) {
                setCategories(data.categories);
            }
            if (data.sub_categories) {
                setSubCategories(data.sub_categories);
            }
        } catch (err) {
            console.error('Error fetching search results:', err);
            setError("Error while loading");
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const applyFilters = () => {
        const newParams = new URLSearchParams();
        
        Object.entries(filters).forEach(([key, value]) => {
            if (value && value.trim()) {
                newParams.set(key, value.trim());
            }
        });

        setSearchParams(newParams);
    };

    const clearFilters = () => {
        setFilters({
            q: '',
            p: '',
            c: '',
            sb: ''
        });
        setSearchParams(new URLSearchParams());
    };

    const getFilteredSubCategories = () => {
        if (!filters.c) return [];
        return subCategories.filter(sub => 
            sub.category === filters.c || 
            sub.category_name === filters.c ||
            categories.find(cat => cat.id === parseInt(filters.c) && cat.name === sub.category)
        );
    };

    const hasActiveFilters = Object.values(filters).some(value => value && value.trim());

    if (isLoading) {
        return (
            <div className="search-results-page">
                <div className="container">
                    <div className="text-center mt-8 text-xl font-semibold">Loading...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="search-results-page">
                <div className="container">
                    <div className="text-center mt-8 text-red-500 font-semibold">{error}</div>
                </div>
            </div>
        );
    }

    return (
        <section className="search-results-page">
            <div className="container">
                <div className="search-header">

                    
                    <div className="filter-toggle">
                        <button 
                            onClick={() => setShowFilters(!showFilters)}
                            className="filter-toggle-btn"
                        >
                            <svg className="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.586a1 1 0 0 1-.293.707l-6.414 6.414a1 1 0 0 0-.293.707V17l-4 2v-6.586a1 1 0 0 0-.293-.707L3.293 7.293A1 1 0 0 1 3 6.586V4z"/>
                            </svg>
                            Filters
                            {hasActiveFilters && <span className="filter-badge">{Object.values(filters).filter(v => v && v.trim()).length}</span>}
                        </button>
                    </div>
                </div>

                {showFilters && (
                    <div className="filters-panel">
                        <div className="filters-grid">
                            <div className="filter-group">
                                <label htmlFor="query">Search Term</label>
                                <input
                                    id="query"
                                    type="text"
                                    placeholder="Product name..."
                                    value={filters.q}
                                    onChange={(e) => handleFilterChange('q', e.target.value)}
                                />
                            </div>


                            <div className="filter-group">
                                <label htmlFor="price">Max Price ($)</label>
                                <input
                                    id="price"
                                    type="number"
                                    min="0"
                                    step="1"
                                    placeholder="100.00"
                                    value={filters.p}
                                    onChange={(e) => handleFilterChange('p', e.target.value)}
                                />
                            </div>

                            <div className="filter-group">
                                <label htmlFor="category">Category</label>
                                <select
                                    id="category"
                                    value={filters.c}
                                    onChange={(e) => {
                                        handleFilterChange('c', e.target.value);
                                        if (e.target.value !== filters.c) {
                                            handleFilterChange('sb', '');
                                        }
                                    }}
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(cat => (
                                        <option key={cat.id || cat.name} value={cat.name}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="filter-group">
                                <label htmlFor="subcategory">Subcategory</label>
                                <select
                                    id="subcategory"
                                    value={filters.sb}
                                    onChange={(e) => handleFilterChange('sb', e.target.value)}
                                    disabled={!filters.c}
                                >
                                    <option value="">All Subcategories</option>
                                    {getFilteredSubCategories().map(subcat => (
                                        <option key={subcat.id || subcat.name} value={subcat.name}>
                                            {subcat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="filter-actions">
                            <button onClick={applyFilters} className="apply-filters-btn">
                                Apply Filters
                            </button>
                            <button onClick={clearFilters} className="clear-filters-btn">
                                Clear All
                            </button>
                        </div>
                    </div>
                )}


                {searchResults.length === 0 ? (
                    <div className="text-center mt-8 text-xl font-semibold">
                        {hasActiveFilters ? 'No products found matching your filters.' : 'Enter search terms to find products.'}
                    </div>
                ) : (
                    <ul className="search-results-list">
                        {searchResults.map((product, index) => (
                            <li key={product.id} className="search-results-item" style={{'--item-index': index}}>
                                <Link to={`/product/${product.id}`}>
                                    <img
                                        src={`http://localhost:8000${product.photo_url}`}
                                        alt={product.title}
                                    />
                                    <div className="search-results-item__content">
                                        <h3 className="search-results-item__title">{product.title}</h3>
                                        <p className="search-results-item__price">${product.price}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}

export default Search;