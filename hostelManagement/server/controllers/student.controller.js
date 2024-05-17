const Student = require('../models/student.model');
const boysRoomsController = require('./boysRooms.controller');
const girlsRoomsController = require('./girlsRooms.controller');

async function insertStudent(student) {
    // Validate the foodPackage field
    const validFoodPackages = ["Nepali Food", "Foreign Food", "Delicious Fusion Delight"];
    if (!validFoodPackages.includes(student.foodPackage)) {
        throw new Error("Invalid food package");
    }

    // Validate the paymentStatus field
    const validPaymentStatus = ["Paid", "Installments"];
    if (!validPaymentStatus.includes(student.paymentStatus)) {
        throw new Error("Invalid payment status");
    }

    let msg;
    if (student.gender === "male") {
        if (student.roomCategory === "Super Deluxe")
            msg = await boysRoomsController.updateSuperDeluxe(student);
        if (student.roomCategory === "Deluxe")
            msg = await boysRoomsController.updateDeluxe(student);
        if (student.roomCategory === "Standard")
            msg = await boysRoomsController.updateStandard(student);
    } else if (student.gender === "female") {
        if (student.roomCategory === "Super Deluxe")
            msg = await girlsRoomsController.updateSuperDeluxe(student);
        if (student.roomCategory === "Deluxe")
            msg = await girlsRoomsController.updateDeluxe(student);
        if (student.roomCategory === "Standard")
            msg = await girlsRoomsController.updateStandard(student);
    }

    if (!msg.acknowledged) {
        throw new Error("Error: Student Details Not Updated Successfully");
    }

    return await new Student(student).save();
}

async function viewStudent() {
    let students = await Student.find({});
    if (students) {
        return students.map(student => ({
            ...student._doc,
            paymentStatus: student.paymentStatus
        }));
    } else {
        throw new Error("No students found");
    }
}

async function updateStudent(student) {
    // Validate the foodPackage field
    const validFoodPackages = ["Nepali Food", "Foreign Food", "Delicious Fusion Delight"];
    if (!validFoodPackages.includes(student.foodPackage)) {
        throw new Error("Invalid food package");
    }

    // Validate the paymentStatus field
    const validPaymentStatus = ["Paid", "Installments"];
    if (!validPaymentStatus.includes(student.paymentStatus)) {
        throw new Error("Invalid payment status");
    }

    return Student.updateOne(
        { roomNo: student.roomNo },
        {
            $set: {
                firstName: student.firstName,
                lastName: student.lastName,
                fatherName: student.fatherName,
                mobileNo: student.mobileNo,
                fatherMobileNo: student.fatherMobileNo,
                email: student.email,
                currentAdress: student.currentAdress,
                collegeName: student.collegeName,
                foodPackage: student.foodPackage,
                paymentStatus: student.paymentStatus
            }
        }
    );
}

async function removeStudent(student) {
    let msg;
    if (student.gender == "male") {
        if (student.roomCategory == "Super Deluxe")
            msg = await boysRoomsController.updateSuperDeluxe(student);
        if (student.roomCategory == "Deluxe")
            msg = await boysRoomsController.updateDeluxe(student);
        if (student.roomCategory == "Standard")
            msg = await boysRoomsController.updateStandard(student);
    } else if (student.gender == "female") {
        if (student.roomCategory == "Super Deluxe")
            msg = await girlsRoomsController.updateSuperDeluxe(student);
        if (student.roomCategory == "Deluxe")
            msg = await girlsRoomsController.updateDeluxe(student);
        if (student.roomCategory == "Standard")
            msg = await girlsRoomsController.updateStandard(student);
    }

    if (!msg.acknowledged) {
        throw new Error("Error: Student Details Not Removed Successfully");
    }

    return Student.updateOne(
        { personNo: student.personNo },
        {
            $set: {
                isStatus: false
            }
        }
    );
}

module.exports = {
    insertStudent,
    viewStudent,
    updateStudent,
    removeStudent
};
