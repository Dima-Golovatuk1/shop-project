// search/search.jsx
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "./search.css"; // Імпортуємо нові стилі

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    useEffect(() => {
        if (query) {
            setIsLoading(true);
            const API_URL = `http://localhost:8000/shop/search/?q=${encodeURIComponent(query)}`;
            
            fetch(API_URL)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setSearchResults(data.products || []);
                })
                .catch(err => {
                    console.error('Error fetching search results:', err);
                    setError("На жаль, сталася помилка при завантаженні.");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setSearchResults([]);
            setIsLoading(false);
        }
    }, [query]);

    if (isLoading) {
        return <div className="text-center mt-8 text-xl font-semibold">Завантаження результатів...</div>;
    }

    if (error) {
        return <div className="text-center mt-8 text-red-500 font-semibold">{error}</div>;
    }

    if (searchResults.length === 0) {
        return (
            <div className="search-results-page">
                <div className="text-center mt-8 text-xl font-semibold">На жаль, за вашим запитом "{query}" нічого не знайдено.</div>
            </div>
        );
    }

    return (
        <section className="search-results-page">
            <div className="container">
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
                                    <p className="search-results-item__price">{product.price}$</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default Search;