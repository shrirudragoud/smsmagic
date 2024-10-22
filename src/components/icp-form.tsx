import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const questions = [
  {
    id: 'leadId',
    label: 'Lead ID',
    description: 'Please Input given Lead Id',
    fullQuestion:
      'Lead id (<span class="text-primary underline font-bold">ICP</span>)',
    detailedDescription: 'Add lead id.',
    imageUrl: '', // blank image URL
    articleUrl: '', // blank article URL
  },
  {
    id: 'industry',
    label: 'Industry',
    description: 'What industry are they in?',
    fullQuestion:
      'What <span class="text-primary underline font-bold">industry</span> are they in?',
    detailedDescription:
      'Identify the specific industry (e.g., healthcare, finance, real estate, retail). Describe the key services or products they offer (e.g., manufacturing, software solutions, service providers). (Search this information on Owler https://www.owler.com/company/page)',
    imageUrl:
      'https://i0.wp.com/gzconsulting.org/wp-content/uploads/2016/09/owler-ge.jpg?resize=700%2C387&ssl=1', // blank image URL
    articleUrl: '', // blank article URL
  },
  {
    id: 'companySize',
    label: 'Company Size',
    description: 'What is the Company Size of the Customer?',
    fullQuestion:
      'How big is their <span class="text-primary underline font-bold">team</span>?',
    detailedDescription:
      'This can give you insights into their operational needs and scalability requirements. For instance, a company with 50 employees might need different features than a company with 500. Search this information on Linkdin page about the company',
    imageUrl:
      'https://www.hubspot.com/hs-fs/hubfs/hubspot-linkedin-company-page-example.jpeg?width=650&name=hubspot-linkedin-company-page-example.jpeg', // blank image URL
    articleUrl: '', // blank article URL
  },
  {
    id: 'location',
    label: 'Location',
    description: 'What is the  geographic location they cater in?',
    fullQuestion: 'What is the  geographic location they cater in?',
    detailedDescription:
      'Are they local, national, or international? Location matters because it can influence market needs, regulations, and even the way you approach sales. This should usually be Decied by the  linkdin profiile of the client in the section of where he/she works',
    imageUrl:
      'https://media.licdn.com/dms/image/v2/C5112AQGNf9wGiFU-Yw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1557608747069?e=2147483647&v=beta&t=Hd_KzTnvnaOkAdXid1cfjvCx9SzvpTbTKUqiODqRsmI', // blank image URL
    articleUrl: '', // blank article URL
  },
  {
    id: 'challenges',
    label: 'Challenges',
    description: 'What are their Challenges?',
    fullQuestion:
      'What are their  <span class="text-primary underline font-bold">Challenges</span> ?',
    detailedDescription:
      'Understanding their pain points is crucial. Whether it’s inefficient processes, high operational costs, or lack of proper tools, knowing their challenges allows you to position your product as the perfect solution.',
    imageUrl: '', // blank image URL
    articleUrl: '', // blank article URL
  },
  {
    id: 'desiredOutcomes',
    label: 'Desired Outcomes',
    description: 'What are they aiming to achieve?',
    fullQuestion:
      'What are they <span class="text-primary underline font-bold">aiming</span> to achieve?',
    detailedDescription:
      'Focus on what the lead hopes to achieve by working with your company. This could include increased sales, improved customer satisfaction, operational efficiency, or regulatory compliance.',
    imageUrl: '', // blank image URL
    articleUrl: '', // blank article URL
  },
  {
    id: 'buyerPersonas',
    label: 'Buyer Personas',
    description: 'Who is the Decision maker?',
    fullQuestion: 'Who is the Decision maker?',
    detailedDescription:
      'Knowing the characteristics of the decision-makers—like their job titles, responsibilities, and decision-making criteria—helps you tailor your approach and speak their language.',
    imageUrl:
      'https://media.licdn.com/dms/image/v2/C5112AQGNf9wGiFU-Yw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1557608747069?e=2147483647&v=beta&t=Hd_KzTnvnaOkAdXid1cfjvCx9SzvpTbTKUqiODqRsmI', // blank image URL
    articleUrl: '', // blank article URL
  },
  {
    id: 'jobsToBeDone',
    label: 'Jobs to Be Done',
    description: 'What tasks or problems do they need to accomplish?',
    fullQuestion:
      'What tasks or <span class="text-primary underline font-bold">problems</span> do they need to accomplish?',
    detailedDescription:
      'This concept focuses on what tasks or problems the client needs to accomplish. These could include improving customer engagement, automating processes, or simplifying communication workflows.',
    imageUrl: '', // blank image URL
    articleUrl: '', // blank article URL
  },
];

interface ICPFormProps {
  username: string;
}

export function ICPForm({ username }: ICPFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [openDescription, setOpenDescription] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem(`icpFormData_${username}`);
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, [username]);

  const handleInputChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    localStorage.setItem(`icpFormData_${username}`, JSON.stringify(formData));
    alert('Form submitted successfully!');
  };

  const currentQ = questions[currentQuestion];

  return (
    <Card className="w-[900px] mx-auto mt-10">
      <CardHeader>
        <CardTitle>ICP Form</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor={currentQ.id} className="text-lg font-semibold">
                <span
                  dangerouslySetInnerHTML={{ __html: currentQ.fullQuestion }}
                ></span>
              </Label>
              <Sheet open={openDescription} onOpenChange={setOpenDescription}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      'ml-2',
                      openDescription &&
                        'bg-green-500 hover:bg-green-900 text-white'
                    )}
                  >
                    Click to know more
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>{currentQ.label}</SheetTitle>
                    <SheetDescription asChild>
                      <div className="space-y-2">
                        <p>{currentQ.description}</p>
                        <p>{currentQ.detailedDescription}</p>
                        {currentQ.imageUrl && (
                          <img
                            src={currentQ.imageUrl}
                            alt={currentQ.label}
                            className="w-full h-auto rounded-lg"
                          />
                        )}
                        {currentQ.articleUrl && (
                          <a
                            href={currentQ.articleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            Learn more about {currentQ.label}
                          </a>
                        )}
                      </div>
                    </SheetDescription>
                  </SheetHeader>
                  <SheetClose asChild>
                    <Button className="mt-4">Close</Button>
                  </SheetClose>
                </SheetContent>
              </Sheet>
            </div>
            {currentQ.id === 'challenges' ||
            currentQ.id === 'reasonsToPurchase' ||
            currentQ.id === 'goals' ? (
              <Textarea
                id={currentQ.id}
                value={formData[currentQ.id] || ''}
                onChange={(e) => handleInputChange(currentQ.id, e.target.value)}
                className="min-h-[100px]"
              />
            ) : (
              <Input
                id={currentQ.id}
                value={formData[currentQ.id] || ''}
                onChange={(e) => handleInputChange(currentQ.id, e.target.value)}
              />
            )}
          </div>
          <div className="flex justify-between">
            <Button onClick={handlePrevious} disabled={currentQuestion === 0}>
              Previous
            </Button>
            {currentQuestion === questions.length - 1 ? (
              <Button onClick={handleSubmit}>Submit</Button>
            ) : (
              <Button onClick={handleNext}>Next</Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
