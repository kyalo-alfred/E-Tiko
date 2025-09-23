<?php
function initiatePayment($amount, $phoneNumber) {
    echo "Payment of KES $amount initiated for $phoneNumber.";
}

// Test output
initiatePayment(1000, '0712345678');