using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _RealmDigital.Domain.BusinessObect
{
   public class Contact
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public string PhoneNumber { get; set; }

        public string EmailAddress { get; set; }

        public string DateCreated { get; set; }

        public string DateModified { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
    }
}


