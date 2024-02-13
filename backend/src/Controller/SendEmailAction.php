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
        $data = json_decode($request->getContent(), true);

        $resend = Resend::client('re_FVip7GLa_4AGNShHcF8QdPdWTHNs7b1my');

        try {
            $resend->emails->send([
                'from' => 'mycoach@mycoach.bendc.site',
                'to' => $_ENV['APP_ENV'] == 'dev' ? $_ENV['MAIL_TO'] : $data['email'],
                'subject' => $data['subject'],
                'html' => $data['message'],
            ]);

            return new Response(
                json_encode(['success' => true]),
                Response::HTTP_CREATED
            );
        } catch (\Exception $e) {
            return new Response(
                json_encode(['error' => $e->getMessage()]),
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }
    }
}
