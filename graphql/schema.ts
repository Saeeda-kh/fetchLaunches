import { gql } from "apollo-server-micro";

//  [Link]! here ! means that this type is non nullable
export const typeDefs = gql `
type Link{
id: String
title: String
description: String
url: String
category: String
imageUrl: String
users: [String] 
}

type Query{
    links: [Link]!
}
`;