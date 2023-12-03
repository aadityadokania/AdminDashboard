import React from "react";
import {
  Button,
} from "@chakra-ui/react";
import styles from "./app.module.css";
import ReactPaginate from "react-paginate";

function FooterMenu({adminData, setadminData, checkboxData, setmasterCheckbox, setpageNumber, pageCount}) {
  return (
    <>
    <div className={styles.pagination}>
        <Button
          color={"white"}
          backgroundColor={"red"}
          className={styles.btn}
          onClick={() => {
            const updatedData = adminData.filter((obj) => {
              return !checkboxData.includes(obj.id);
            });

            setadminData(updatedData);
            setmasterCheckbox(false);
          }}
        >
          Delete Selected
        </Button>

        <div className={styles.pagination_div}>
          <Button onClick={() => setpageNumber(0)}>First</Button>
          <div>
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={({ selected }) => {
                setpageNumber(selected);
              }}
              containerClassName={styles.paginatebtns}
              activeClassName={styles.active}
            />
          </div>
          <Button onClick={() => setpageNumber(pageCount - 1)}>Last</Button>
        </div>
      </div>
    </>
  )
}

export default FooterMenu