import { useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchVolunteer } from "../redux/user";
import VolunteerComponent from "../components/VolunteerComponent";

const TableVolunteer = () => {
  let { dataVolunteer, isLoading } = useSelector((state) => {
    return state.user;
  });
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVolunteer());
  }, []);
  
  if (isLoading) {
    <h1>Please Wait</h1>;
  }
  return (
    <>
      <Container className="mt-5">
        <h3 className="text-center">Daftar Semua Relawan</h3>
        <Table striped hover className="styled-table">
          <thead>
            <tr>
              <th className="text-center">No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Jadwal Kelas</th>
              <th>Detail</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dataVolunteer?.map((el, index) => {
              return (
                <VolunteerComponent
                  data={el}
                  index={index}
                  status={el.verified}
                  key={el.id}
                />
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default TableVolunteer;
