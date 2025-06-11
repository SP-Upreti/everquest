import { travelFaqs } from '@/data/faq';
import { Accordion, AccordionContent, AccordionTrigger, AccordionItem } from '@/components/ui/accordion';

const FAQ: React.FC = () => {
  return (
    <div className="min-h-screen px-16 py-24">
      <h2 className='z-[99] text-5xl mb-14'>Frequently Asked Questions</h2>
      <div className="grid grid-cols-3 gap-6 overflow-visible">
        {
          travelFaqs.map((data, idx) => (
            <div className="relative" key={idx}>
              <h2 className=' text-2xl font-semibold pb-8 pt-3 sticky top-0 bg-[#121212]'>
                {data.title} ?
                <div className="relative">
                  <div className="absolute -top-[5rem] -z-10 left-0 h-10 w-full bg-[#121212]"></div>

                </div>
              </h2>
              <div className="space-y-2">
                {data.faq.map((faq, idx) => (

                  <Accordion type='single' collapsible className="space-y-2 max-w-sm" key={idx}>
                    <AccordionItem value={idx + "val"}>
                      <AccordionTrigger>{faq.ques}</AccordionTrigger>
                      <AccordionContent>{faq.ans}</AccordionContent>
                    </AccordionItem>
                  </Accordion>


                ))}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default FAQ;
