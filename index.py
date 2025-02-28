import smtplib
import tkinter as tk
from tkinter import messagebox, ttk
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def send_emails():
    sender_email = sender_entry.get()
    sender_password = password_entry.get()
    subject = subject_entry.get()
    message_body = message_text.get("1.0", tk.END)
    
    recipient_list = email_text.get("1.0", tk.END).strip().split(",")
    
    if not sender_email or not sender_password or not recipient_list or not message_body:
        messagebox.showerror("Error", "All fields must be filled!")
        return
    
    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
        
        for recipient in recipient_list:
            recipient = recipient.strip()
            if recipient:
                msg = MIMEMultipart()
                msg['From'] = sender_email
                msg['To'] = recipient
                msg['Subject'] = subject
                msg.attach(MIMEText(message_body, 'plain'))
                
                server.sendmail(sender_email, recipient, msg.as_string())
        
        server.quit()
        messagebox.showinfo("Success", "Emails sent successfully!")
    except Exception as e:
        messagebox.showerror("Error", f"Failed to send emails: {e}")

# GUI Setup
root = tk.Tk()
root.title("NTTC Expiry Email Notifier")
root.geometry("600x750")
root.configure(padx=20, pady=20)

# Style configuration
style = ttk.Style()
style.configure('TLabel', font=('Arial', 10))
style.configure('TEntry', font=('Arial', 10))
style.configure('TButton', font=('Arial', 10, 'bold'))

# Create main frame
main_frame = ttk.Frame(root)
main_frame.pack(fill=tk.BOTH, expand=True)

# Sender Details Frame
sender_frame = ttk.LabelFrame(main_frame, text="Sender Details", padding="10")
sender_frame.pack(fill=tk.X, pady=(0, 15))

ttk.Label(sender_frame, text="Email:").pack(anchor='w')
sender_entry = ttk.Entry(sender_frame, width=50)
sender_entry.pack(fill=tk.X, pady=(0, 10))

ttk.Label(sender_frame, text="Password:").pack(anchor='w')
password_entry = ttk.Entry(sender_frame, width=50, show="*")
password_entry.pack(fill=tk.X)

# Email Content Frame
content_frame = ttk.LabelFrame(main_frame, text="Email Content", padding="10")
content_frame.pack(fill=tk.BOTH, expand=True, pady=(0, 15))

ttk.Label(content_frame, text="Subject:").pack(anchor='w')
subject_entry = ttk.Entry(content_frame, width=50)
subject_entry.pack(fill=tk.X, pady=(0, 10))

ttk.Label(content_frame, text="Message:").pack(anchor='w')
message_text = tk.Text(content_frame, height=5, width=50, font=('Arial', 10))
message_text.pack(fill=tk.BOTH, expand=True, pady=(0, 10))

# Recipients Frame
recipients_frame = ttk.LabelFrame(main_frame, text="Recipients", padding="10")
recipients_frame.pack(fill=tk.BOTH, expand=True, pady=(0, 15))

ttk.Label(recipients_frame, text="Email Addresses (one per line):").pack(anchor='w')
email_text = tk.Text(recipients_frame, height=10, width=50, font=('Arial', 10))
email_text.pack(fill=tk.BOTH, expand=True)

# Send Button
send_button = ttk.Button(
    main_frame, 
    text="Send Emails", 
    command=send_emails,
    style='TButton',
    padding=(20, 10)
)
send_button.pack(pady=(0, 10))

# Status bar
status_bar = ttk.Label(main_frame, text="Ready", relief=tk.SUNKEN, anchor=tk.W)
status_bar.pack(fill=tk.X)

root.mainloop()
