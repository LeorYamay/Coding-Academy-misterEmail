import { useEffect, useState } from "react";

import { Mail } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

export function SearchBar({ filterby, onSetFilter }) {
    const [searchText, setSearchText] = useState("")
    const [tempFilter, setTempFilter] = useState(filterby)
    const handleKeyDown = (event) => {
        console.log("event.key", event.key)
        if (event.key === 'Enter') {
            console.log(searchText)
            setTempFilter(prevFilterBy => ({ ...prevFilterBy, hasText: searchText }))
            onSetFilter({hasText: searchText})
        }
    }


    return (
        <div className="search-bar">
            <SearchIcon />
            <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search Mail"
                onKeyDown={handleKeyDown}
            />
            <TuneIcon />
        </div>
    )
}

export function FilterForm({ filterby, setFilterBy }) {
    const [filterData, setFilterData] = useState(filterby)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilterData({ ...filterData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFilterBy(filterData);
    };

    return (
        <form className="filter-form">
            <label>
                From:
                <input
                    type="text"
                    name="from"
                    value={filterData.from}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                To:
                <input
                    type="text"
                    name="to"
                    value={filterData.to}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Subject:
                <input
                    type="text"
                    name="subject"
                    value={filterData.subject}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Has the words:
                <input
                    type="text"
                    name="hasWords"
                    value={filterData.hasWords}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Doesn't have:
                <input
                    type="text"
                    name="doesntHave"
                    value={filterData.doesntHave}
                    onChange={handleChange}
                />
            </label>
            <br />
            <button type="submit">Search</button>
        </form>
    )
}
