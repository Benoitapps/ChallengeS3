<?php

namespace App\Controller;

use App\Mail\Email;
use Resend;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;

#[AsController]
class SendEmailAction extends AbstractController
{
    #[Route('/send-email', methods: ['POST'])]
    public function __invoke(Request $request): Response
    {
        // Assuming that $request->getContent() contains the JSON payload with email data
        $data = json_decode($request->getContent(), true);

        // Use the Email object properties to construct the email content
        $resend = Resend::client('re_V795pJfN_Gsb5uF7bVN36jvUEcw74Pj2R');

        try {
            $resend->emails->send([
                'from' => 'onboarding@resend.dev',
                'to' => 'benoitdecarli77@gmail.com',
                'subject' => 'hello world',
                'html' => '<p>Congrats on sending your <strong>first email</strong>!</p>'
            ]);

            // You can add additional logic here if needed

            // Return a success response
            return new Response(
                json_encode(['success' => true]),
                Response::HTTP_CREATED
            );
        } catch (\Exception $e) {
            // Handle the exception appropriately (log it, return an error response, etc.)
            return new Response(
                json_encode(['error' => $e->getMessage()]),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
