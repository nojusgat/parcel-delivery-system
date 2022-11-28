import { Modal, Pagination, Table } from "flowbite-react";
import React from "react";
import { getParcels } from "../utils/api";
import { ParcelDetails } from "./parcelDetails";

interface AssignParcelModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  courier: any;
  setCourier: (parcel: any) => void;
}

export function AssignParcelModal(props: AssignParcelModalProps) {
  const close = () => {
    props.setShow(false);
  };

  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [parcels, setParcels] = React.useState<any>(null);

  React.useEffect(() => {
    getParcels(page, 5, "&unassigned=true")
      .then((res) => {
        setParcels(res?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  const onPageChange = (page: number) => {
    setPage(page);
  };

  return (
    <React.Fragment>
      <Modal show={props.show} size="8xl" popup={true} onClose={close}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Assign Parcel to Courier{" "}
              <span className="text-blue-700">
                {props.courier?.firstname} {props.courier?.lastname}
              </span>
            </h3>
            <Table>
              <Table.Head>
                <Table.HeadCell>#</Table.HeadCell>
                <Table.HeadCell>Sender</Table.HeadCell>
                <Table.HeadCell>Receiver</Table.HeadCell>
                <Table.HeadCell>Weight</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Actions</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {parcels?.results.map((parcel: any) => (
                  <ParcelDetails
                    key={parcel.parcelNumber}
                    parcelData={parcel}
                    showAssignBtn={true}
                  />
                ))}
              </Table.Body>
            </Table>
            {parcels?.total_pages > 1 ? (
              <Pagination
                currentPage={page}
                onPageChange={onPageChange}
                showIcons={true}
                totalPages={parcels?.total_pages || 1}
              />
            ) : null}
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}
