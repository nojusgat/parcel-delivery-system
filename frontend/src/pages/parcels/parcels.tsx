import { Table, Pagination, Badge, Button } from "flowbite-react";
import React from "react";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { getParcels } from "../../utils/api";
import { Loader } from "../../components/loader";
import { useNavigate } from "react-router-dom";

export default function Parcels() {
  const [page, setPage] = React.useState(1);
  const [parcels, setParcels] = React.useState<any>(null);

  const [loadingHeader, setLoadingHeader] = React.useState(true);
  const [loadingParcels, setLoadingParcels] = React.useState(true);

  const navigate = useNavigate();

  React.useEffect(() => {
    getParcels(page)
      .then((res) => {
        setParcels(res?.data);
      })
      .finally(() => {
        setLoadingParcels(false);
      });
  }, [page]);

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const setToDeliver = (id: string) => {
    localStorage.setItem("parcelId", id);
    navigate("/deliveries");
  };

  return (
    <>
      {loadingHeader || loadingParcels ? <Loader /> : null}
      <div className="container mx-auto px-4">
        <Header loading={loadingHeader} setLoading={setLoadingHeader} />
        <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Parcels
        </h1>
        <Table>
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Sender</Table.HeadCell>
            <Table.HeadCell>Receiver</Table.HeadCell>
            <Table.HeadCell>Weight</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Deliver</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {parcels?.results.map((parcel: any) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={parcel.parcelNumber}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {parcel.parcelNumber}
                </Table.Cell>
                <Table.Cell>
                  <span className="flex flex-col gap-2">
                    <span>{parcel.senderName}</span>
                    <span>{parcel.senderAddress}</span>
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="flex flex-col gap-2">
                    <span>{parcel.receiverName}</span>
                    <span>{parcel.receiverAddress}</span>
                  </span>
                </Table.Cell>
                <Table.Cell>{parcel.weight} kg</Table.Cell>
                <Table.Cell>{parcel.price} €</Table.Cell>
                <Table.Cell>
                  <span className="flex flex-wrap">
                    <Badge
                      color={
                        parcel.status === "Pending"
                          ? "warning"
                          : parcel.status === "In progress"
                          ? "pink"
                          : "success"
                      }
                      size="sm"
                      className="text-center"
                    >
                      {parcel.status}
                    </Badge>
                  </span>
                </Table.Cell>
                <Table.Cell>
                  {parcel.status === "Pending" ||
                  parcel.status === "In progress" ? (
                    <Button onClick={() => setToDeliver(parcel.parcelNumber)}>
                      Deliver
                    </Button>
                  ) : null}
                </Table.Cell>
              </Table.Row>
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
        <Footer />
      </div>
    </>
  );
}
