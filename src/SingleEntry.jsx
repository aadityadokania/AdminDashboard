import React from 'react'
import {
  Tr,
  Input,
  IconButton,
  Td,
  Checkbox,
} from "@chakra-ui/react";
import styles from "./app.module.css";
import { DeleteIcon, EditIcon, CheckIcon } from "@chakra-ui/icons";
import { useState } from 'react';

function SingleEntry({checkboxData, single , setcheckboxData, adminData, setadminData}) {

  const [edit, setedit] = useState(null);
  const [updateValues, setupdateValues] = useState({}); 
  
  return (
         <Tr key={single.id} className={styles.tablerow}>
                    <Td>
                      <Checkbox
                        borderColor={"black"}
                        isChecked={checkboxData.includes(single.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setcheckboxData([...checkboxData, single.id]);
                          } else {
                            const updatedList = checkboxData.filter(
                              (n) => n !== single.id
                            );
                            setcheckboxData(updatedList);
                          }
                        }}
                      />
                    </Td>
                    <Td>
                      {edit == single.id ? (
                        <Input
                          value={updateValues.name}
                          onChange={(e) => {
                            setupdateValues({
                              ...updateValues,
                              name: e.target.value,
                            });
                          }}
                        />
                      ) : (
                        single.name
                      )}
                    </Td>
                    <Td>
                      {edit == single.id ? (
                        <Input
                          value={updateValues.email}
                          onChange={(e) => {
                            setupdateValues({
                              ...updateValues,
                              email: e.target.value,
                            });
                          }}
                        />
                      ) : (
                        single.email
                      )}
                    </Td>
                    <Td>
                      {edit == single.id ? (
                        <Input
                          value={updateValues.role}
                          onChange={(e) => {
                            setupdateValues({
                              ...updateValues,
                              role: e.target.value,
                            });
                          }}
                        />
                      ) : (
                        single.role
                      )}
                    </Td>
                    <Td>
                      {edit == single.id ? (
                        <IconButton
                          icon={<CheckIcon />}
                          style={{ marginRight: "5px" }}
                          onClick={() => {
                            const updatedData = adminData.map((obj) =>
                              obj.id == updateValues.id ? updateValues : obj
                            );
                            setadminData(updatedData);
                            setedit(null);
                          }}
                        />
                      ) : (
                        <IconButton
                          icon={<EditIcon />}
                          style={{ marginRight: "5px" }}
                          onClick={() => {
                            setedit(single.id);
                            setupdateValues(single);
                          }}
                        />
                      )}

                      <IconButton
                        icon={<DeleteIcon />}
                        color={"red"}
                        onClick={() => {
                          const updatedData = adminData.filter(
                            (obj) => obj.id !== single.id
                          );
                          setadminData(updatedData);
                        }}
                      />
                    </Td>
                  </Tr>
    
  )
}

export default SingleEntry