import React, {useState,useEffect} from 'react';

const productUrl = "https://fakestoreapi.com/products";

const PaginationExample = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [items,setItems]=useState([]);

    const fetchProducts = async () => {
        let response = await fetch(productUrl);
        
        if(!response.ok){
            console.log("Couldn't fetch products");
        }

        let products = await response.json();
                setItems(products);
    }

    useEffect(() => {
        fetchProducts();
    },[])

    const totalPages = Math.ceil(items.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div>
            <ul>
                {
                currentItems.map(item => (
                    <li key={item}>{item.title}</li>
                ))
}
            </ul>

            <div>
            <button onClick={()=> setCurrentPage(prev => Math.max(prev - 1, 1))} diabled={currentPage === 1}>
                Previous
            </button>
            <span> Page {currentPage} of {totalPages}</span>
            <button onClick={()=>
                setCurrentPage(prev => Math.min(prev +1, totalPages))} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
        </div>
        
    )
}

export default PaginationExample;