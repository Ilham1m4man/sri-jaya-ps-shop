import { useState, useEffect } from "react";
import {
  Text,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

export default function CartTable({
  objectMap,
  currentRole,
  checkedItems,
  idProduct,
  counter,
  disabled,
  setCheckedItems,
  setIdProduct,
  setCounter,
  setDisabled,
}) {
  /* const [counter, setCounter] = useState(1);
  const [disabled, setDisabled] = useState(false); */
  /*
  console.log("ini checkedItems "+checkedItems);
  console.log("ini idProduct "+idProduct);
  console.log("ini counter "+counter);
  console.log("ini disabled "+disabled); */

  /* useEffect(() => {
    if (counter === 1 || counter <= 1) {
      return setDisabled(true);
    }
    return setDisabled(false);
  }, [counter]); */

  const allChecked = Object.values(checkedItems).every(Boolean);
  const isIndeterminate = Object.values(checkedItems).some(Boolean) && !allChecked;

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                <Checkbox
                  className="text-gry-cart"
                  isChecked={allChecked}
                  isIndeterminate={isIndeterminate}
                  onChange={(e) =>
                    setCheckedItems(
                      Object.entries(Object.entries(counter)).map((item, index) => {
                        return e.target.checked;
                      })
                    )
                  }
                >
                  <Text fontSize={12}>P R O D U K</Text>
                </Checkbox>
              </Th>
              <Th>
                <Text fontWeight={"bold"} className="text-gry-cart">
                  K U A N T I T A S
                </Text>
              </Th>
              <Th>
                <Text fontWeight={"bold"} className="text-gry-cart">
                  H A R G A
                </Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.entries(Object.entries(counter)).map((item, index) => {
              console.log(counter[index])
              return (
                <Tr key={index}>
                  <Td>
                    <Checkbox
                      isChecked={checkedItems[index]}
                      onChange={(e) =>
                        setCheckedItems((prevState) => {
                          return { ...prevState, [index]: e.target.checked };
                        })
                      }
                    >
                      <div className="flex justify-between items-center gap-4">
                        <div className="border-2 border-footer_fontClr rounded-xl">
                          <img
                            className="w-[100px] object-contain aspect-square"
                            src="https://firebasestorage.googleapis.com/v0/b/sri-jaya-shop.appspot.com/o/images%2Fproduct%2F67LNUYs2BM3njZ2sfEAG%2FPF_800-removebg-preview.jpg?alt=media&token=2fb221c6-31dd-463c-a719-b5930e47e12e"
                            alt=""
                          />
                        </div>
                        <p>PF 800 10kg</p>
                      </div>
                    </Checkbox>
                  </Td>
                  <Td>
                    <div className="flex h-[40px] rounded-lg relative bg-transparent">
                      <button
                        onClick={() =>
                          setCounter((prevState) => {
                            return { ...prevState, [index]: parseInt(prevState[index]) - 1 };
                          })
                        }
                        disabled={disabled[index]}
                        className={`border-[2px] border-black bg-gry-counterClr text-black hover:text-gray-700 ${
                          currentRole === "Konsumer"
                            ? "hover:bg-grn-300"
                            : "hover:bg-ble-300"
                        } h-full w-[30px] sm:w-[40px] rounded-l-[8px] cursor-pointer outline-none`}
                      >
                        <span className="m-auto text-xl font-normal">−</span>
                      </button>
                      <input
                        type="text"
                        className="border-y-[2px] border-black focus:outline-none text-center w-[30px] sm:w-[40px] bg-white font-semibold hover:text-black focus:text-black text-base md:text-lg cursor-default flex items-center text-grn-950  outline-none"
                        name="custom-input-number"
                        value={counter[index]}
                        disabled={true}
                      ></input>
                      <button
                        onClick={() =>
                          setCounter((prevState) => {
                            return { ...prevState, [index]: parseInt(prevState[index]) + 1 };
                          })
                        }
                        className={`bg-gry-counterClr border-[2px] border-black text-black hover:text-gray-700 ${
                          currentRole === "Konsumer"
                            ? "hover:bg-grn-300"
                            : "hover:bg-ble-300"
                        } h-full w-[30px] sm:w-[40px] rounded-r-[8px] cursor-pointer`}
                      >
                        <span className="m-auto text-xl font-normal">+</span>
                      </button>
                    </div>
                  </Td>
                  <Td>
                    <p>Rp. 2.000.000</p>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
