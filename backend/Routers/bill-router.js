import express from 'express'
import { addNewBill, getAllBills } from '../controllers/billController.js';

const router = express.Router()


router.get("/api/bills",getAllBills)
router.post("/newbill",addNewBill)


export default router;