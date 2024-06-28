# Tamper Proof Data

At Bequest, we require that important user data is tamper proof. Otherwise, our system can incorrectly distribute assets if our internal server or database is breached. 

**1. How does the client ensure that their data has not been tampered with?**
A: We use hashing and digital signatures. Hashing checks data integrity, making sure it hasn't changed during storage or transfer. Digital signatures verify data authenticity, protecting against unauthorized changes.

<br />
**2. If the data has been tampered with, how can the client recover the lost data?**
A: To recover lost data, clients rely on secure backups. We keep a backup of data that's also hashed and signed, so we can restore the original if there's a breach or unauthorized changes. Tokens in requests add an extra layer of security, ensuring only trusted parties can manage data recovery.

Edit this repo to answer these two questions using any technologies you'd like, there any many possible solutions. Feel free to add comments.

### To run the apps:
```npm run start``` in both the frontend and backend

## To make a submission:
1. Clone the repo
2. Make a PR with your changes in your repo
3. Email your github repository to robert@bequest.finance
