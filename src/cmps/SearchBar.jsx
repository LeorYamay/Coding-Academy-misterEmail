import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Mail } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

export function SearchBar() {
    const [tempFilter, setTempFilter] = useState("")
    const [searchParams, setSearchParams] = useSearchParams();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const tempParams = new URLSearchParams();
            Object.entries(tempFilter).forEach(([key, value]) => {
                if (value.toString().trim() !== '') {
                    tempParams.append(key, value);
                }
            })
            setSearchParams(tempParams)
        }
    }

    const updateTempFilter = (fieldsToUpdate) => {
        setTempFilter(prevTempFilter => ({ ...prevTempFilter, ...fieldsToUpdate }))
    }
    
    const setSearchText = (text) => {
        setTempFilter(prevFilterBy => ({ ...prevFilterBy, hasText: text }))
    }
    return (
        <div className="search-bar">
            <SearchIcon />
            <input
                type="text"
                value={[tempFilter.hasText]}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search Mail"
                onKeyDown={handleKeyDown}
            />
            <TuneIcon />
            {/* <FilterForm
                updateTempFilter={updateTempFilter}
            /> */}
        </div>
    )
}

export function FilterForm({ updateTempFilter, tempFilter }) {
    const [filterData, setFilterData] = useState(tempFilter)

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
