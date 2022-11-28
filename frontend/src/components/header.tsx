import { Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation, matchPath, useNavigate } from "react-router-dom";

import { FiLogIn } from "react-icons/fi";
import { FaShippingFast } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { getUserInfo, saveUserInfo } from "../utils/storage";
import { LoginModal } from "./loginModal";
import React from "react";
import { getProfile, logout } from "../utils/api";

export function Header(props: { loading: boolean, setLoading: (loading: boolean) => void }) {
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [userToken, setUserToken] = React.useState<any>(false);
  const [isCourier, setIsCourier] = React.useState<any>(false);

  React.useEffect(() => {
    setUserToken(getUserInfo());
  }, [showLoginModal]);

  React.useMemo(() => {
    if (userToken) {
      getProfile()
        .then((res) => {
          if (res?.status === 200) {
            const newUserInfo = { ...getUserInfo(), courier: res.data.courier };
            saveUserInfo(newUserInfo);
            if(res.data.courier) {
              setIsCourier(true);
            }
          } else {
            throw new Error();
          }
        })
        .catch(() => {
          saveUserInfo(null);
          setUserToken(null);
          setIsCourier(false);
        }).finally(() => {
          props.setLoading(false);
        });
    } else if (userToken === null) {
      props.setLoading(false);
      setIsCourier(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken]);

  const logoutUser = async () => {
    logout();
    setUserToken(null);
    navigate("/");
  };

  return (
    <>
      <Navbar fluid={false} rounded={true} className="mb-5">
        <Link to="/">
          <Navbar.Brand>
            <FaShippingFast className="mr-2 h-10 w-10 text-blue-700" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Parcel delivery
            </span>
          </Navbar.Brand>
        </Link>
        <div className="flex md:order-2">
          {userToken ? (
            <Dropdown
              arrowIcon={false}
              inline={true}
              label={<CgProfile className="text-blue-700 w-8 h-8 mr-2" />}
            >
              <Dropdown.Header>
                <span className="block text-sm">{userToken?.user?.username}</span>
                <span className="block truncate text-sm font-medium">
                  {userToken?.user?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item onClick={logoutUser}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Button className="mr-2" onClick={() => setShowLoginModal(true)}>
              <FiLogIn className="sm:mr-2 h-4 w-4" />
              <span className="hidden sm:flex">Sign in</span>
            </Button>
          )}
          {userToken?.user?.role === "Admin" || userToken?.courier !== null ? (
            <Navbar.Toggle />
          ) : null}
        </div>
        <Navbar.Collapse>
          <Link to="/">
            <Navbar.Link active={matchPath(pathname, "/") ? true : false}>
              Track Parcel
            </Navbar.Link>
          </Link>
          {userToken?.user?.role === "User" ? <></> : null}
          {isCourier ? (
            <>
              <Link to="/deliveries">
                <Navbar.Link
                  active={matchPath(pathname, "/deliveries") ? true : false}
                >
                  Deliveries
                </Navbar.Link>
              </Link>
              <Link to="/parcels">
                <Navbar.Link
                  active={matchPath(pathname, "/parcels") ? true : false}
                >
                  All Parcels
                </Navbar.Link>
              </Link>
            </>
          ) : null}
          {userToken?.user?.role === "Admin" ? (
            <>
              <Link to="/couriers/manage">
                <Navbar.Link
                  active={matchPath(pathname, "/couriers/manage") ? true : false}
                >
                  Couriers
                </Navbar.Link>
              </Link>
              <Link to="/parcels/manage">
                <Navbar.Link
                  active={matchPath(pathname, "/parcels/manage") ? true : false}
                >
                  Parcels
                </Navbar.Link>
              </Link>
              <Link to="/cars/manage">
                <Navbar.Link
                  active={matchPath(pathname, "/cars/manage") ? true : false}
                >
                  Cars
                </Navbar.Link>
              </Link>
            </>
          ) : null}
        </Navbar.Collapse>
      </Navbar>
      <LoginModal show={showLoginModal} setShow={setShowLoginModal} />
    </>
  );
}