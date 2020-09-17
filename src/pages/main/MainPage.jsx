import React, { useEffect, useState, useMemo } from "react";

import api from "../../services/api";
import { Pagination, Search } from "../../components/DataTable";
import { Card } from "../../components";

import "./main.css";

const MainPage = (props) => {
  const [credits, setCredits] = useState([]);
  // const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const ITEMS_PER_PAGE = 5;

  const getData = () => {
    api
      .get("/api/v1/cred")
      .then((resp) => {
        setCredits(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const creditsData = useMemo(() => {
    let computedCredits = credits;

    if (search) {
      computedCredits = computedCredits.filter(
        (credit) =>
          credit.fullName.toLowerCase().includes(search.toLowerCase()) ||
          credit.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedCredits.length);

    //Sorting credits
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedCredits = computedCredits.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }

    //Current Page slice
    return computedCredits.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [credits, currentPage, search, sorting]);

  return (
    <section id="main" className="main">
      <div className="main-search">
        <header className="main-search__header">
          <Search
            onSearch={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
          />
          <Pagination
            total={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </header>
      </div>

      <div className="main-container">
        {creditsData.map((credit) => (
          <Card key={credit._id} data={credit} />
        ))}
      </div>
    </section>
  );
};
export default MainPage;
