using _RealmDigital.DataAccessLayer.Framework.EntityFrameworkModels;
using System;
using System.Collections.Generic;
using System.Linq;
using personObject = _RealmDigital.Domain.BusinessObect;

namespace _RealmDigital.DataAccessLayer.Tasks
{
    public class PeopleTask
    {
        public List<spGetUserContactList_Result> GetUserContactInformation()
        {
            try
            {
                using (var context = new AddressBookEntities())
                {
                    return context.spGetUserContactList().ToList();
                }
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }

        }

        public List<spSeachContactList_Result> SearchContact(string searchKeyWord)
        {
            try
            {
                using (var context = new AddressBookEntities())
                {
                    return context.spSeachContactList(searchKeyWord).ToList();
                }
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }

        }



        public int MaintainContactDetails(personObject.Contact contact)
        {
            if (string.IsNullOrWhiteSpace(contact.PhoneNumber)) return 0;

            try
            {
                


                using (var context = new AddressBookEntities())
                {
                    //Update Contact
                    if (contact.Id > 0)
                    {
                        var contactObj = context.AddressBooks.Where(c => c.Id == contact.Id).First();

                        contactObj.EmailAddress = contact.EmailAddress;
                        contactObj.PhoneNumber = contact.PhoneNumber;
                        contactObj.UserId = contact.UserId;
                        return context.SaveChanges();
                    }

                    //Add New Contact

                    context.AddressBooks.Add(new AddressBook()
                    {
                        EmailAddress = contact.EmailAddress,
                        PhoneNumber = contact.PhoneNumber,
                        UserId = contact.UserId
                    });

                    return context.SaveChanges();
                }
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public int DeleteContactDetails(personObject.Contact contact)
        {
            if (contact.Id == 0) return 0;

            try
            {
                using (var context = new AddressBookEntities())
                {
                    var contactObj = context.AddressBooks.Where(c => c.Id == contact.Id).First();

                    context.AddressBooks.Remove(contactObj);

                    return context.SaveChanges();
                }
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public List<personObject.DropDownListObject> GetPeopleList()
        {

            try
            {
                var people = new List<personObject.DropDownListObject>();

                using (var context = new AddressBookEntities())
                {
                    var peopleList = context.Users.ToList();

                    foreach (var personObject in peopleList)
                    {
                        people.Add(new personObject.DropDownListObject()
                        {

                            Name = personObject.Name + " " + personObject.Surname,

                            Value = personObject.Id.ToString()

                        });
                    }

                    return people;
                }
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

    }
}
