import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Input,
  Th,
  IconButton,
  Td,
  TableContainer,
  Checkbox,
} from "@chakra-ui/react";
import styles from "./app.module.css";
import { DeleteIcon } from "@chakra-ui/icons";
import SingleEntry from "./SingleEntry";
import FooterMenu from "./FooterMenu";

function DataTable() {
  const [adminData, setadminData] = useState([]); // whole table data
  const [checkboxData, setcheckboxData] = useState([]);
  const [searchBox, setsearchBox] = useState("");
  const [masterCheckbox, setmasterCheckbox] = useState(false);
  //pagination
  const [pageNumber, setpageNumber] = useState(0);

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = adminData.slice(
    pagesVisited,
    pagesVisited + usersPerPage
  );
  const pageCount = Math.ceil(adminData.length / usersPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!res.ok) {
        }

        const data = await res.json();
        setadminData(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <Input
          placeholder={"Search"}
          style={{ maxWidth: "50%", margin: "10px" }}
          onChange={(e) => setsearchBox(e.target.value)}
        />

        <IconButton
          icon={<DeleteIcon />}
          backgroundColor={"red"}
          color={"white"}
          onClick={() => {
            setadminData([]);
          }}
        />
      </div>

      <TableContainer className={styles.tablecontainer}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                <Checkbox
                  style={{ borderColor: "black" }}
                  isChecked={masterCheckbox}
                  onChange={() => {
                    if (!masterCheckbox) {
                      const data = displayUsers.map((obj) => obj.id);
                      setcheckboxData(data);
                      setmasterCheckbox(true);
                    } else {
                      setcheckboxData([]);
                      setmasterCheckbox(false);
                    }
                  }}
                />
              </Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
            {displayUsers
              .filter((item) => {
                return searchBox.toLowerCase() === ""
                  ? item
                  : item.name.toLowerCase().includes(searchBox);
              })
              .map((single) => {
                return (
                  <SingleEntry
                    checkboxData={checkboxData}
                    setcheckboxData={setcheckboxData}
                    adminData={adminData}
                    setadminData={setadminData}
                    single={single}
                    key={single.id}
                  />
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>

      <FooterMenu
        adminData={adminData}
        checkboxData={checkboxData}
        pageCount={pageCount}
        setmasterCheckbox={setmasterCheckbox}
        setpageNumber={setpageNumber}
        setadminData={setadminData}
      />
    </div>
  );
}

export default DataTable;
