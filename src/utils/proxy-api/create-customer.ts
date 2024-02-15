"use server"

import { proxyApiClient } from "@/utils/proxy-api/client"

const CUSTOMER_LIST_TTL = 0
const USER_TTL = 0

/**
 * Create a customer in the proxy API.
 * @see https://github.com/aurora-is-near/bb-rules/tree/acc-deal/docs/acc#creating-customer
 */
export const createCustomer = async (teamId: number) => {
  await proxyApiClient.update([
    {
      // This template will be used for all customer-related lists
      // (blacklists, whitelists, subscription lists etc)
      op_type: "set_template",
      var_type: "set",
      template_key: `template::deal::acc::customers::${teamId}::list`,

      // OPTIONAL: make set elements expire after some time
      set_element_expiration_duration: CUSTOMER_LIST_TTL,

      // MUST be true if set_element_expiration_duration > 0, otherwise it MUST be false
      set_element_touch_by_read: CUSTOMER_LIST_TTL > 0,
    },
    {
      // This template will be used for user-auth related data.
      // This step is mainly needed for controlling expiration time for such data.
      op_type: "set_template",
      var_type: "string",
      template_key: `template::deal::acc::customers::${teamId}::userIdMapping`,

      // OPTIONAL: make auth-data expire after some time
      expiration_duration: USER_TTL, // Seconds
      // MUST be true if expiration_duration > 0, otherwise it MUST be false
      touch_by_read: USER_TTL > 0,
    },
    {
      // This template will be used for variables that keep user registration time.
      // This step is mainly needed for controlling expiration time for such variables.
      op_type: "set_template",
      var_type: "number",
      template_key: `template::deal::acc::customers::${teamId}::userRegTime`,
      currency: "second",

      // OPTIONAL: make user registration time expire after some time
      // Hint: it's strongly recommended to have here same value as on previous step
      expiration_duration: USER_TTL, // Seconds
      // MUST be true if expiration_duration > 0, otherwise it MUST be false
      touch_by_read: USER_TTL > 0,
    },
    {
      // Adding customer to list of customers
      op_type: "insert",
      var_type: "set",
      var_key: "deal::acc::customers",
      set_element: `${teamId}`,
    },
    {
      // This set will be used to control order of deal execution for this customer.
      op_type: "set",
      var_type: "set",
      var_key: `deal::acc::customers::${teamId}::dealPrios`,
      template_key: "template::deal::acc::execList",
    },
    {
      // Create ACL varset for customer (will be used for providing customer's access to variables)
      op_type: "set",
      var_type: "string",
      var_key: `acl::varsets::accCustomers::${teamId}`,
      template_key: "template::acl::varset",
    },
    {
      // Populate ACL varset for customer (will be used for providing customer's access to variables)
      op_type: "set_value",
      var_type: "string",
      var_key: `acl::varsets::accCustomers::${teamId}`,
      string_value: `customer ${teamId}`,
    },
    {
      // Allowing access to:
      // - pattern acc::customer
      // - with substitution of varset accCustomers::<CUSTOMER_ID>
      // - for user accCustomers::<CUSTOMER_ID>
      op_type: "set",
      var_type: "string",
      var_key: `acl::permissions::accCustomers::${teamId}::acc::customer::accCustomers::${teamId}`,
      template_key: "template::acl::permission",
    },
  ])
}
