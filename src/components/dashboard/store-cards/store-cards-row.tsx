import { Card, Stack, Col } from "react-bootstrap";
import styles from "./store-cards.module.css";
import avatarImg from "../../../assets/header-avater.png";
import { LuChevronRight } from "react-icons/lu";

const STORE_CARDS = [
  { name: "New York Store", performance: 78, activeMembers: 12, extraMembers: 9 },
  { name: "Los Angeles Store", performance: 78, activeMembers: 12, extraMembers: 9 },
  { name: "Chicago Store", performance: 78, activeMembers: 12, extraMembers: 9 },
  { name: "Houston Store", performance: 78, activeMembers: 12, extraMembers: 9 },
];

export default function StoreCardsRow() {
  return (
    <>
      {STORE_CARDS.map((store) => (
        <Col key={store.name} xs={12} sm={6} xl={3}>
          <Card className="border-0 rounded-4 h-100">
            <Card.Body className="p-4">
              <Stack direction="horizontal" className="justify-content-between align-items-start">
                <div className="color-text-primary-custom fw-bold">{store.name}</div>
                <button type="button" className={`btn btn-link p-0 text-secondary text-decoration-none fw-semibold fs-12 mt-1`} aria-label={`See more for ${store.name}`}>
                  <span className="me-1 mt-2">See More</span>
                  <LuChevronRight size={13} />
                </button>
              </Stack>

              <div className="text-primary-custom mt-3 fw-bold fs-10">Performance Seller - {store.performance}%</div>
              <Stack direction="horizontal" className="justify-content-between align-items-center">
                <div className="text-secondary fs-14 fw-semibold">{store.activeMembers} Active Members</div>
                <div className="d-flex align-items-center" aria-hidden="true">
                  {[0, 1, 2].map((idx) => (
                    <img key={idx} src={avatarImg} alt="" className={styles.avatar} />
                  ))}
                  <span className={`badge border-0 text-primary-custom ${styles.extraCount}`}>+{store.extraMembers}</span>
                </div>
              </Stack>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  );
}
