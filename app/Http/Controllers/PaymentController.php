use App\Models\Payment;

$payment = Payment::create([
    'booking_id' => $request->booking_id,
    'amount' => $request->amount,
    'phone_number' => $request->phone_number,
    'status' => 'PENDING',
]);
