import { Injectable } from '@angular/core';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  addDoc,
  collection,
  getDocs,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { School } from '../Certification';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: Firestore) { }

  async addCertifications(
    schools: School[]
  ): Promise<DocumentReference<DocumentData, DocumentData>[]> {
    const certificationsCollection = collection(this.firestore, 'certificates');

    const addCertificationPromises: Promise<
      DocumentReference<DocumentData, DocumentData>[]
    > = Promise.all(
      schools.map(async (school) => {
        // Create a new object with the same structure as CertificationData
        const schoolData: School = {
          schoolName: school.schoolName,
          certificates: [],
        };

        // Add each certificate under the school
        for (const certificate of school.certificates) {
          schoolData.certificates.push({
            title: certificate.title,
            subtitle: certificate.subtitle,
            description: certificate.description,
            url: certificate.url,
          });
        }

        // Add the school to Firestore and return the reference
        return await addDoc(certificationsCollection, schoolData);
      })
    );

    const results = await addCertificationPromises;
    return results;
  }

  getCertificates(): Observable<School[]> {
    const certificationsCollection = collection(this.firestore, 'certificates');
    return from(getDocs(certificationsCollection)).pipe(
      map((querySnapshot) => {
        return querySnapshot.docs.map((doc) => {
          const schoolData = doc.data();
          return {
            schoolName: schoolData['schoolName'],
            certificates: schoolData['certificates'] || [],
          };
        });
      })
    );
  }
}
